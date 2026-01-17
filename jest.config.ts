import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Caminho para o seu app Next.js
  dir: './',
})

// Configurações personalizadas do Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Lidar com imports absolutos (ex: @/components/...)
    '^@/(.*)$': '<rootDir>/$1',
  },
}

// createJestConfig é exportado dessa forma para carregar o next.config.js durante os testes
export default createJestConfig(config)