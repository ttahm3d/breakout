import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, FormikField } from "../../../components";
import styled from "styled-components";
import { Content } from "../../../styles/globals";
import GoogleLogo from "../../../assets/icons/GoogleLogo.svg";

type SignInType = {
  email: string;
  password: string;
};

export default function SingIn(): JSX.Element {
  const initialValues: SignInType = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short"),
  });

  return (
    <Content>
      <FormContainer>
        <FormHeading>Signin</FormHeading>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}>
          <Form>
            <FormikField id="email" type="email" name="email" label="Email" />
            <FormikField
              id="password"
              type="password"
              name="password"
              label="password"
            />
            <LoginBtn variant="primary__block" fullwidth radius={0.25}>
              <>Sign In</>
            </LoginBtn>
            <LoginBtn variant="primary__outline" fullwidth radius={0.25}>
              <FlexCenter>
                <FlexCenter>
                  <img src={GoogleLogo} alt="Google Logo" />
                </FlexCenter>
                &nbsp; Sign In With Google
              </FlexCenter>
            </LoginBtn>
          </Form>
        </Formik>
      </FormContainer>
    </Content>
  );
}

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 80vh;
`;

const FormHeading = styled.h3`
  margin: 0;
  padding-bottom: 1rem;
`;

const LoginBtn = styled(Button)`
  margin: 1.5rem 0 0;
  padding: 0.45rem;

  :last-child {
    margin-bottom: 1.5rem;
  }
`;

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
