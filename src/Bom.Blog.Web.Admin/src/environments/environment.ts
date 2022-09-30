import { User } from "oidc-client-ts";

const baseUrl = "http://localhost:3000";

export const oidcConfig = {
  authority: "https://localhost:44400",
  client_id: "Blog_React",
  redirect_uri: baseUrl,
  response_type: "code",
  scope: "offline_access Blog profile openid email roles phone address",
  monitorSession: true,

  onSigninCallback: (_user: User | void): void => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};
