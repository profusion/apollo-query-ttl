import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { Constants } from './stubs/shared';
import NormalQueryComponent from './stubs/NormalQueryComponent';
import cache from './mocks/cache';
import mock from './mocks/mock';

describe('useQueryWithTTL hook', () => {
  afterEach(() => jest.clearAllTimers());

  it('should ignore cache and fetch data from server when TTL expires', async () => {
    jest.useFakeTimers();

    const { getByText, rerender } = render(
      <MockedProvider cache={cache} mocks={mock}>
        <NormalQueryComponent />
      </MockedProvider>,
    );
    await waitFor(() => expect(getByText(/Todo from cache/)).toBeTruthy());

    jest.advanceTimersByTime(Constants.hookParams.ttl + 50);
    rerender(
      <MockedProvider cache={cache} mocks={mock}>
        <NormalQueryComponent />
      </MockedProvider>,
    );
    await waitFor(() => expect(getByText(/Todo from server/)).toBeTruthy());
  });

  it('should respect onCompleted() callback provided by developer', async () => {
    const onCompletedCb = jest.fn();
    render(
      <MockedProvider cache={cache} mocks={mock}>
        <NormalQueryComponent onCompleted={onCompletedCb} />
      </MockedProvider>,
    );

    await waitFor(() => expect(onCompletedCb).toHaveBeenCalled());
  });
});
