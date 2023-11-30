import React from "react"
import {
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
  styled,
  List,
  ListItem,
} from "@mui/material"
import Logo from "../assets/dps.png"

const StyledTextfield = styled(TextField)({
  input: { color: "white" },
  fieldset: { borderColor: "white" },
  label: { color: "white" },
})

function Homepage() {
  const [password, setPassword] = React.useState("")
  const [repeatedPassword, setRepeatedPassword] = React.useState("")

  const [passwordFocused, setPasswordFocused] = React.useState(false)
  const [repeatPasswordFocused, setRepeatPasswordFocused] =
    React.useState(false)

  const hasLengthError = password.length < 8 || password.length > 16
  const hasLowerCaseError = !password.match(/[a-z]/)
  const hasUpperCaseError = !password.match(/[A-Z]/)
  const hasDigitError = !password.match(/[0-9]/)
  const hasSpecialCharError = !password.match(/[^A-Za-z0-9]/)

  const passwordRules = () => {
    return (
      <Box width={"fit-content"}>
        {hasLengthError && (
          <Typography>
            Password must be at between 8 and 16 characters long
          </Typography>
        )}
        {hasLowerCaseError && (
          <Typography>
            Password must contain at least one lowercase letter
          </Typography>
        )}
        {hasUpperCaseError && (
          <Typography>
            Password must contain at least one uppercase letter
          </Typography>
        )}
        {hasDigitError && (
          <Typography>Password must contain at least one digit</Typography>
        )}
        {hasSpecialCharError && (
          <Typography>
            Password must contain at least one special character{" "}
          </Typography>
        )}
      </Box>
    )
  }

  const passwordsMatch = () => {
    return repeatedPassword === password
  }

  return (
    <Stack
      sx={{
        background: "linear-gradient(45deg, #080021, #0a0b64)",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box display={"flex"} flexDirection={"column"} mx={3}>
        <Box
          component={"img"}
          sx={{
            borderRadius: 1.5,
            alignItems: "center",
            justifyContent: "center",
          }}
          p={1}
          src={Logo}
          width={"100%"}
        />
        <StyledTextfield
          label="Password"
          type="password"
          id="password"
          name="password"
          required
          fullWidth
          size="small"
          margin="dense"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value)
          }}
          error={
            (passwordFocused || password.length > 0) &&
            (hasLengthError ||
              hasLowerCaseError ||
              hasUpperCaseError ||
              hasDigitError ||
              hasSpecialCharError)
          }
          //   helperText={passwordRules()}
          onFocus={() => {
            setPasswordFocused(true)
          }}
          onBlur={() => {
            setPasswordFocused(false)
          }}
          //   sx={{
          //     input: { color: "white" },
          //     fieldset: { borderColor: "white" },
          //     label: { color: "white" },
          //   }}
        />
        <StyledTextfield
          label="Repeat Password"
          type="password"
          id="repeat-password"
          name="repeat-password"
          required
          fullWidth
          size="small"
          margin="dense"
          value={repeatedPassword}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setRepeatedPassword(event.target.value)
          }}
          error={
            (repeatPasswordFocused || repeatedPassword.length > 0) &&
            !passwordsMatch()
          }
          helperText={
            (repeatPasswordFocused || repeatedPassword.length > 0) &&
            !passwordsMatch() &&
            "Passwords do not match"
          }
          onFocus={() => {
            setRepeatPasswordFocused(true)
          }}
          onBlur={() => {
            setRepeatPasswordFocused(false)
          }}
        />

        <List sx={{ listStyleType: "disc", pl: 2 }}>
          <ListItem
            sx={{
              display: "list-item",
              "::marker": { color: hasLengthError ? "red" : "green" },
              px: 0,
            }}
          >
            <Typography color={hasLengthError ? "red" : "green"}>
              Password must be at between 8 and 16 characters long
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              display: "list-item",
              "::marker": { color: hasLowerCaseError ? "red" : "green" },
              px: 0,
            }}
          >
            <Typography color={hasLowerCaseError ? "red" : "green"}>
              Password must contain at least one lowercase letter
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              display: "list-item",
              "::marker": { color: hasUpperCaseError ? "red" : "green" },
              px: 0,
            }}
          >
            <Typography color={hasUpperCaseError ? "red" : "green"}>
              Password must contain at least one uppercase letter
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              display: "list-item",
              "::marker": { color: hasDigitError ? "red" : "green" },
              px: 0,
            }}
          >
            <Typography color={hasDigitError ? "red" : "green"}>
              Password must contain at least one digit
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              display: "list-item",
              "::marker": { color: hasSpecialCharError ? "red" : "green" },
              px: 0,
            }}
          >
            <Typography color={hasSpecialCharError ? "red" : "green"}>
              Password must contain at least one special character{" "}
            </Typography>
          </ListItem>
        </List>
      </Box>
    </Stack>
  )
}

export default Homepage
