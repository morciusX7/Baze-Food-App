import { CardWrapper } from "@/app/auth/card-wrapper";
import { Button } from "../ui/button";
import { StudentLoginButton } from "./student-login-button";
import { VendorLoginButton } from "./vendor-login-button";

export const LoginSelectorForm = () => {
  return (
    <CardWrapper headerLabel="MEAL SYSTEM">
      <StudentLoginButton>
        <Button variant="default" size={"lg"}>
          Login as a Student
        </Button>
      </StudentLoginButton>
      <VendorLoginButton>
        <Button variant="default" size={"lg"}>
          Login as a Vendor
        </Button>
      </VendorLoginButton>
    </CardWrapper>
  );
};
