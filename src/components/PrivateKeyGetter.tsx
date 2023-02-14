import { Box, Input, FormControl, FormLabel, Button } from "@chakra-ui/react";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import React, { useState } from "react";
import { getAccountFromV3 } from "@planetarium/account-local";

export const PrivateKeyGetter = () => {
  const [keyFile, setKeyFile] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <Box p={2} bg="blue.300">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const acc = await getAccountFromV3(keyFile, password);
            console.log(acc.getPublicKey());
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <FormLabel>Web3 Secret Storage</FormLabel>
        <Input
          type="file"
          name="keyFile"
          onChange={(e) => {
            const fr = new FileReader();
            fr.readAsText(e.target.files![0]);
            typeof fr.result === "string" && setKeyFile(fr.result);
          }}
        ></Input>
        <FormLabel>Passphrase</FormLabel>
        <Input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
};
