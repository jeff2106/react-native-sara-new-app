import React from 'react'
import { render, screen, waitFor } from '@testing-library/react-native'
import Example from './Example'
import { Provider } from 'react-redux'
import { store } from '../../store'

test('render correctly', async () => {
  const component = (
    <Provider store={store}>
      <Example />
    </Provider>
  )

  render(component)
  const findingText = screen.getByTestId('user-name')
  expect(findingText).toBeTruthy()
})