import { useMemo } from "react";
import styled from "styled-components";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, FormikField, NavigationLink } from "../../../components";
import { Content } from "../../../styles/globals";

type SignUpType = {
  firstName: string;
  lastName: string;
  userName: string;
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
  const initialValues: SignUpType = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Cannot be empty"),
    lastName: Yup.string().required("Cannot be empty"),
    userName: Yup.string()
      .required("Cannot be empty")
      .min(4, "username is too short"),
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
        id: "firstName",
        type: "firstName",
        name: "firstName",
        label: "First Name",
      },
      {
        id: "lastName",
        type: "lastName",
        name: "lastName",
        label: "Last Name",
      },
      {
        id: "userName",
        type: "userName",
        name: "userName",
        label: "User Name",
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
    <ExtContent>
      <FormContainer>
        <FormHeading>Sign Up</FormHeading>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => console.log(values)}
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
              Alreay have an account?&nbsp;&nbsp;
              <NavigationLink to="/auth/signup">Sign In</NavigationLink>
            </div>
          </>
        </Formik>
      </FormContainer>
    </ExtContent>
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

const ExtContent = styled(Content)`
  padding: 4rem 0;
`;
