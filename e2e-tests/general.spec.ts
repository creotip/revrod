import { delay } from './../src/utils/index'
import { test, expect } from '@playwright/test'

test('should display weather information', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.getByRole('textbox').fill('london')
  await page.waitForSelector('.chakra-button', { state: 'visible' })

  await page.click('.chakra-button')

  await page.waitForSelector('.weather-widget')

  const temperature = await page.textContent('.weather-widget .temperature')
  expect(temperature).toMatch(/-?\d+°/)

  const weatherCondition = await page.textContent('.weather-widget .weather-condition')
  expect(weatherCondition).toBeTruthy()

  const windSpeed = await page.textContent('.weather-widget .wind-speed')
  expect(windSpeed).toBeTruthy()

  const humidity = await page.textContent('.weather-widget .humidity')
  expect(humidity).toBeTruthy()

  const forecastItems = await page.$$('.weather-widget .forecast-item')
  expect(forecastItems.length).toBeGreaterThanOrEqual(1)
})

test('should toggle between zip and city search', async ({ page }) => {
  await page.goto('http://localhost:3000')

  await page.check('.zip-checkbox')

  const placeholder = await page.getAttribute('.search-input', 'placeholder')
  expect(placeholder).toContain('zip')

  await page.uncheck('.zip-checkbox')

  const updatedPlaceholder = await page.getAttribute('.search-input', 'placeholder')
  expect(updatedPlaceholder).not.toContain('zip')
})

test('should check connectivity notification', async ({ page, context }) => {
  await page.goto('http://localhost:3000')
  await delay(1000)
  await context.setOffline(true)

  const errorAlert = await page.textContent('.chakra-alert__title')
  expect(errorAlert).toContain('You are offline')

  await delay(6000)
  await context.setOffline(false)
  const successAlert = await page.textContent('.chakra-alert__title')
  expect(successAlert).toContain('You are online')
  await page.close()
})
