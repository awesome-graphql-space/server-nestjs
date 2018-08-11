import { createError } from 'apollo-errors';

export const MissingDataError = createError('MissingDataError', {
  message: 'Not all required fields are filled in.',
});

export const NotAuthenticatedError = createError('NotAuthenticatedError', {
  message: 'Not authourized to make this action.',
});

export const NoConnectionError = createError('NoConnectionError', {
  message: 'No connection found.',
});

export const InvalidEmailError = createError('InvalidEmailError', {
  message: 'Provided email is invalid.',
});

export const ResetTokenExpiredError = createError('ResetTokenExpiredError', {
  message: 'resetToken expired.',
});

export const PasswordTooShortError = createError('PasswordTooShortError', {
  message: 'Password is too short.',
});

export const UserNotFoundError = createError('UserNotFoundError', {
  message: 'No user found.',
});

export const InvalidInviteTokenError = createError('InvalidInviteTokenError', {
  message: 'inviteToken is invalid.',
});

export const InvalidEmailConfirmToken = createError(
  'InvalidEmailConfirmToken',
  {
    message: 'emailConfirmToken is invalid.',
  },
);

export const UserEmailExistsError = createError('UserEmailExistsError', {
  message: 'User already exists with this email.',
});

export const UserUsernameExistsError = createError('UserUsernameExistsError', {
  message: 'User already exists with this username.',
});

export const UserInviteNotAcceptedError = createError(
  'UserInviteNotAcceptedError',
  {
    message: 'User has not accepted invite yet.',
  },
);

export const UserDeletedError = createError('UserDeletedError', {
  message: 'User has been deleted.',
});

export const UserEmailUnconfirmedError = createError(
  'UserEmailUnconfirmedError',
  {
    message: 'Users email has not been confirmed yet.',
  },
);

export const InvalidOldPasswordError = createError('InvalidOldPasswordError', {
  message: 'Invalid old password.',
});