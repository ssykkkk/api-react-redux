import FormAuth from '../../components/FormAuth/FormAuth';
import { withLayout } from '../../components/Main/Main';

function SignUp() {
  return (
    <section>
      <div className='container'>
        <FormAuth
          title='Sign up'
          link='/signin'
          titleLink='Have an account?'
          isSignUp={true}
        />
      </div>
    </section>
  );
}

export default withLayout(SignUp);
