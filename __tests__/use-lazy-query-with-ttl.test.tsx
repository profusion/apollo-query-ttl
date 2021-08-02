import React from 'react';
import { render, waitFor, fireEvent, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { Constants } from './stubs/shared';
import LazyQueryComponent from './stubs/LazyQueryComponent';
import cache from './mocks/cache';
import mock from './mocks/mock';

describe('useLazyQueryWithTTL hook', () => {
  afterEach(() => jest.clearAllTimers());

  it('should ignore cache and fetch data from server when TTL expires', async () => {
    jest.useFakeTimers();

    const { getByText, rerender, getByTestId } = render(
      <MockedProvider cache={cache} mocks={mock}>
        <LazyQueryComponent />
      </MockedProvider>,
    );
    fireEvent.click(getByTestId('fetch-button'));
    await waitFor(() => expect(getByText(/Todo from cache/)).toBeTruthy());

    jest.advanceTimersByTime(Constants.hookParams.ttl + 50);
    fireEvent.click(getByTestId('refetch-button'));
    rerender(
      <MockedProvider cache={cache} mocks={mock}>
        <LazyQueryComponent />
      </MockedProvider>,
    );
    await waitFor(() => expect(getByText(/Todo from server/)).toBeTruthy());
  });

  it('should respect onCompleted() callback provided by developer', async () => {
    jest.useRealTimers();

    const onCompletedCb = jest.fn();
    const { getByTestId } = render(
      <MockedProvider mocks={mock}>
        <LazyQueryComponent onCompleted={onCompletedCb} />
      </MockedProvider>,
    );
    act(() => {
      fireEvent.click(getByTestId('fetch-button'));
    });
    await waitFor(() => expect(onCompletedCb).toHaveBeenCalled());
  });
});
