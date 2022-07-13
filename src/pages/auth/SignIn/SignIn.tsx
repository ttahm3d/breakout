import { useMemo } from "react";
import { Form, Formik } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
import { useAppDispatch } from "../../../hooks";
import { Button, FormikField, NavigationLink } from "../../../components";
import { FlexCenter } from "../../../styles/globals";
import {
  googleSignInHandler,
  signInHandler,
} from "../../../redux/features/Auth/thunk";
import GoogleLogo from "../../../assets/icons/GoogleLogo.svg";
import { SignInType } from "../../../types";
import { useLocation, useNavigate } from "react-router-dom";
import { Content } from "../../../styles/globals";

type FieldType = {
  id: string;
  type: string;
  name: string;
  label: string;
};

export default function SingIn(): JSX.Element {
  const initialValues: SignInType = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();

  const location: any = useLocation();

  const dispatch = useAppDispatch();

  const handleSubmit = (signInData: SignInType, { resetForm }: any) => {
    dispatch(signInHandler(signInData));
    resetForm();
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/home");
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short"),
  });

  const formikFields: FieldType[] = useMemo(() => {
    return [
      {
        id: "email",
        type: "email",
        name: "email",
        label: "email",
      },
      {
        id: "password",
        type: "password",
        name: "password",
        label: "password",
      },
    ];
  }, []);

  return (
    <Content>
      <FormContainer>
        <FormHeading>Sign In</FormHeading>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <>
            <Form>
              {formikFields.map((field) => (
                <FormikField
                  key={field.id}
                  id={field.id}
                  label={field.label}
                  name={field.name}
                  type={field.type}
                />
              ))}
              <FlexCenter>
                <LoginBtn
                  variant="primary__block"
                  fullwidth
                  radius={0.25}
                  type="submit">
                  Sign In
                </LoginBtn>
              </FlexCenter>
            </Form>
            <FlexCenter>
              <LoginBtn
                variant="primary__outline"
                fullwidth
                radius={0.25}
                onClick={() => dispatch(googleSignInHandler())}>
                <FlexCenter>
                  <FlexCenter>
                    <img src={GoogleLogo} alt="Google Logo" />
                  </FlexCenter>
                  &nbsp; Sign In With Google
                </FlexCenter>
              </LoginBtn>
            </FlexCenter>
            <div>
              Don't have an account?&nbsp;&nbsp;
              <NavigationLink to="/auth/signup">Create one now</NavigationLink>
            </div>
          </>
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
  font-size: 1.5rem;
  padding-bottom: 1rem;
`;

const LoginBtn = styled(Button)`
  margin: 1rem 0 0;
  padding: 0.45rem;

  :last-child {
    margin: 1rem 0;
    width: 18.025rem;
  }
`;
