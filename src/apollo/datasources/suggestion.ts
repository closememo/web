import AbstractApi from 'apollo/datasources/abstractApi';

class SuggestionAPI extends AbstractApi {

  public async getSuggestions() {
    return await this.get('/query/client/suggestions');
  }

  public async getSuggestion({ suggestionId }: { suggestionId: string }) {
    return await this.get(`/query/client/suggestions/${suggestionId}`);
  }

  public async createSuggestion({ content }: { content: string }) {
    await this.post('/command/client/create-suggestion', {
      content,
    });
    return true;
  }

  public async updateSuggestion({ suggestionId, content }: { suggestionId: string, content: string }) {
    await this.post('/command/client/update-suggestion', {
      suggestionId,
      content,
    });
    return true;
  }

  public async deleteSuggestion({ suggestionId }: { suggestionId: string }) {
    await this.post('/command/client/delete-suggestion', {
      suggestionId,
    });
    return true;
  }
}

export default SuggestionAPI;
