import {
  AuthenticationBindings,
  AuthenticationMetadata,
} from '@loopback/authentication';
import {
  Getter,
  globalInterceptor,
  inject,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise,
} from '@loopback/context';
import {HttpErrors} from '@loopback/rest';
import {MyUserProfile, RequiredRoles} from '../types';

/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@globalInterceptor('', {tags: {name: 'authorize'}})
export class AuthorizeInterceptor implements Provider<Interceptor> {
  constructor(
    @inject(AuthenticationBindings.METADATA)
    public metadata: AuthenticationMetadata[],

    // dependency inject
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    public getCurrentUser: Getter<MyUserProfile>,
  ) {}

  /**
   * This method is used by LoopBack context to produce an interceptor function
   * for the binding.
   *
   * @returns An interceptor function
   */
  value() {
    return this.intercept.bind(this);
  }

  /**
   * The logic to intercept an invocation
   * @param _invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(
    _invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    // eslint-disable-next-line no-useless-catch
    try {
      // if you not provide options in your @authenticate decorator
      if (!this.metadata) return next();

      const requiredRoles = this.metadata[0].options as RequiredRoles;

      const user = await this.getCurrentUser();

      if (
        requiredRoles.required !== undefined &&
        !requiredRoles.required.includes(user.role)
      ) {
        throw new HttpErrors.Forbidden('INVALID ACCESS');
      }

      const result = await next();
      // Add post-invocation logic here
      return result;
    } catch (err) {
      if (err.code === 11000) {
        throw new HttpErrors.Conflict('Email is already taken.');
      }
      // Add error handling logic here
      throw new HttpErrors.InternalServerError('Something went wrong.');
    }
  }
}
