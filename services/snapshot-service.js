import fetch from 'isomorphic-unfetch';
import querystring from 'querystring';

import config from '../config';

const useApi = config.graphqlSource === 'api';

export const SnapshotService = {
  async getSnapshots({ limit = 10, placeName, ...rest }) {
    if (useApi) {
      const response = await fetch(
        `${config.apiUri}/snapshot/?${querystring.stringify({
          limit,
          placeName,
          ...rest
        })}`
      );

      const snapshots = await response.json();
      if (!Array.isArray(snapshots)) {
        return [];
      }

      return snapshots.map(s => ({
        ...s,
        placeName
      }));
    }

    return [
      {
        cuid: 'test',
        temperature: 1,
        pressure: 1,
        humidity: 1,
        placeName
      }
    ];
  },

  async getSnapshotImage({ id, webp }) {
    const response = await fetch(
      `${config.apiUri}/snapshot/${id}/image?webp=${webp}`
    );
    const buffer = await response.buffer();

    return {
      buffer,
      headers: {
        'Content-type': response.headers.get('content-type'),
        'Cache-control': response.headers.get('cache-control'),
        Etag: response.headers.get('Etag')
      }
    };
  }
};