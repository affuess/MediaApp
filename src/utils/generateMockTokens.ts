interface MockTokens {
    accessToken: string;
    refreshToken: string;
}

const randomPart = (): string => Math.random().toString(36).slice(2, 10);

/**
 * Генерирует пару фейковых токенов на основе переданных данных.
 * Это НЕ настоящий JWT — просто уникальная строка для практики
 * хранения/удаления токенов, пока нет бэкенда с настоящей регистрацией.
 */
export const generateMockTokens = (seed: string): MockTokens => {
    const safeSeed = seed.replace(/\s+/g, '_');
    const timestamp = Date.now();

    return {
        accessToken: `access.${safeSeed}.${timestamp}.${randomPart()}`,
        refreshToken: `refresh.${safeSeed}.${timestamp}.${randomPart()}`,
    };
};