import React from 'react';
import { useGetDifferenceQuery } from 'apollo/generated/hooks';
import { ChangePatch, Difference, Line, LineDelta } from 'apollo/generated/types';
import Loading from 'client/components/Loading';
import DeltaType from 'client/constants/DeltaType';

const NBSP = '\u00A0';
const ZWSP = '\u200B';

function DifferenceMain({ differenceId }: { differenceId: string }) {

  const { data, error, loading } = useGetDifferenceQuery({
    variables: { differenceId },
  });

  const difference: Difference | undefined = data?.difference;

  if (loading) return <Loading />;
  if (error || !data) return <p>Error</p>;

  const lineDeltas: LineDelta[] | undefined = difference?.lineDeltas;
  const padded: (LineDelta | null)[] = getPadded(lineDeltas);

  return (
    <>
      <div className='my-4'>
        <h2>변경상세</h2>
      </div>
      <table className='w-100'>
        <colgroup>
          <col span={1} style={{ width: '5%' }} />
          <col span={1} style={{ width: '45%' }} />
          <col span={1} style={{ width: '5%' }} />
          <col span={1} style={{ width: '45%' }} />
        </colgroup>
        <tbody>
        {padded.map((lineDelta, index) => (
          generateRow(lineDelta, index)
        ))}
        </tbody>
      </table>
    </>
  );
}

function getPadded(lineDeltas: LineDelta[] | undefined): (LineDelta | null)[] {
  if (!lineDeltas) {
    return [];
  }

  let result: (LineDelta | null)[] = [null]; // 첫 번째에 null 추가

  for (let i = 0; i < lineDeltas.length; i++) {
    const curr = lineDeltas[i];
    const next = lineDeltas[i + 1];

    result.push(curr);

    // next 가 없다면 (마지막 요소) padding 없음
    if (!next) {
      continue;
    }

    const currSource = curr.source;
    const nextSource = next.source;
    // 현재 source position 과 다음 source position 이 다르고, 연속하지 않은 경우 padding 을 위해 null 추가
    if ((currSource.position != nextSource.position) && (currSource.position + 1 != nextSource.position)) {
      result.push(null)
    }
  }

  result.push(null); // 마지막에 null 추가

  return result;
}

function generateRow(lineDelta: LineDelta | null, index: number): JSX.Element {

  if (!lineDelta) {
    return (
      <tr key={'diff-' + index}>
        <td className='number-column empty-column' />
        <td className='code-column empty-line'><span>{ZWSP}</span></td>
        <td className='number-column empty-column' />
        <td className='code-column empty-line'><span>{ZWSP}</span></td>
      </tr>
    )
  }

  const source: Line = lineDelta.source;
  const target: Line = lineDelta.target;
  const patches: ChangePatch[] = lineDelta.changePatches;

  switch (lineDelta.type) {
    case DeltaType.CHANGE:
      return (
        <tr key={'diff-' + index}>
          <td className='number-column deletion-column'>{source.position + 1}</td>
          <td className='code-column deletion-line'>
            <span className='diff-code-span' data-code-marker='-'>
              {patches.map((patch: ChangePatch, innerIndex) =>
                generateOrigSpan(patch, 'orig-' + index + '-' + innerIndex))}
            </span>
          </td>
          <td className='number-column addition-column'>{target.position + 1}</td>
          <td className='code-column addition-line'>
            <span className='diff-code-span' data-code-marker='+'>
              {patches.map((patch: ChangePatch, innerIndex) =>
                generateCompLine(patch, 'comp-' + index + '-' + innerIndex))}
            </span>
          </td>
        </tr>
      );
    case DeltaType.DELETE:
      return (
        <tr key={'diff-' + index}>
          <td className='number-column deletion-column'>{source.position + 1}</td>
          <td className='code-column deletion-line'>
            <span className='diff-code-span' data-code-marker='-'>{source.value || ZWSP}</span>
          </td>
          <td className='number-column empty-column' />
          <td className='code-column empty-line' />
        </tr>
      );
    case DeltaType.INSERT:
      return (
        <tr key={'diff-' + index}>
          <td className='number-column empty-column' />
          <td className='code-column empty-line' />
          <td className='number-column addition-column'>{target.position + 1}</td>
          <td className='code-column addition-line'>
            <span className='diff-code-span' data-code-marker='+'>{target.value || ZWSP}</span>
          </td>
        </tr>
      );
    default:
      return (
        <tr key={'diff-' + index}>
          <td className='number-column'>{source.position + 1}</td>
          <td className='code-column'>
            <span className='diff-code-span'>{source.value}</span>
          </td>
          <td className='number-column'>{target.position + 1}</td>
          <td className='code-column'>
            <span className='diff-code-span'>{target.value}</span>
          </td>
        </tr>
      );
  }
}

function generateOrigSpan(patch: ChangePatch, key: string): JSX.Element {
  if (patch.type === DeltaType.INSERT) {
    return <span key={key}/>;
  }
  const highlighted: boolean = patch.type === DeltaType.CHANGE || patch.type === DeltaType.DELETE;
  const value = patch.value.replace(/ /g, NBSP);
  return <span key={key} className={highlighted ? 'deletion-word' : ''}>{value}</span>;
}

function generateCompLine(patch: ChangePatch, key: string): JSX.Element {
  if (patch.type === DeltaType.DELETE) {
    return <span key={key}/>;
  }
  const highlighted: boolean = patch.type === DeltaType.CHANGE || patch.type === DeltaType.INSERT;
  let value = (patch.type === DeltaType.CHANGE ? patch.changed : patch.value) || '';
  value = value.replace(/ /g, NBSP);
  return <span key={key} className={highlighted ? 'addition-word' : ''}>{value}</span>;
}

export default DifferenceMain;
