const baseUrl = 'http://localhost:3000';

export const oidcConfig = {
    authority: 'https://localhost:44399',
    client_id: 'Blog_React',
    redirect_uri: baseUrl,
    response_type: 'code',
    scope: 'offline_access Blog profile openid email role phone address',
};
