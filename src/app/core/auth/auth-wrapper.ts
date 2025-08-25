// wrap calls to Auth for mocking module export functions in unit tests
// Ref: https://github.com/jasmine/jasmine/issues/1414, https://jasmine.github.io/tutorials/module_mocking
import {
  fetchAuthSession,
  signInWithRedirect,
  signOut
} from 'aws-amplify/auth';

export const authWrapper = {
  fetchAuthSession: () => fetchAuthSession(),
  signInWithRedirect: () => signInWithRedirect(),
  signOut: () => signOut()
};
