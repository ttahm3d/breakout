import { useMemo } from "react";
import styled from "styled-components";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, FormikField, NavigationLink } from "../../../components";
import { signUpHandler } from "../../../redux/services/authServices";
import { useAppDispatch } from "../../../hooks";

type SignUpType = {
  fullName: string;
  email: string;
  password: string;
};

type FieldType = {
  id: string;
  type: string;
  name: string;
  label: string;
};

export default function SignUp(): JSX.Element {
  const dispatch = useAppDispatch();

  const initialValues: SignUpType = {
    fullName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Cannot be empty"),
    email: Yup.string()
      .email("Invalid Email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short"),
  });

  const handleSubmit = async (values: SignUpType) => {
    dispatch(signUpHandler(values));
  };

  const formikFields: FieldType[] = useMemo(() => {
    return [
      {
        id: "fullName",
        type: "fullName",
        name: "fullName",
        label: "Full Name",
      },
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
    <FormContainer>
      <FormHeading>Sign Up</FormHeading>
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
            <LoginBtn variant="primary__block" fullwidth radius={0.25}>
              Sign Up
            </LoginBtn>
          </Form>
          <div>
            Already have an account?&nbsp;&nbsp;
            <NavigationLink to="/auth/signin">Sign In</NavigationLink>
          </div>
        </>
      </Formik>
    </FormContainer>
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
    margin: 1.5rem 0;
  }
`;
