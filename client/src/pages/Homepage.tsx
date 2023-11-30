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
import axios from "axios"

const StyledTextfield = styled(TextField)({
  input: { color: "white" },
  fieldset: {
    borderColor: "white",
  },
  label: { color: "white" },
})

function Homepage() {
  const [password, setPassword] = React.useState("")
  const [repeatedPassword, setRepeatedPassword] = React.useState("")

  const [passwordFocused, setPasswordFocused] = React.useState(false)
  const [repeatPasswordFocused, setRepeatPasswordFocused] =
    React.useState(false)

  const [hasEnglishWords, setHasEnglishWords] = React.useState(true)

  const hasLength = password.length >= 8 && password.length <= 16
  const hasLattinLetter = password.match(/[A-Za-z]/)
  const hasUpperCase = password.match(/[A-Z]/)
  const hasDigit = password.match(/[0-9]/)
  const hasSpecialChar = password.match(/[^A-Za-z0-9]/)

  const passwordsMatch = () => {
    return repeatedPassword === password
  }

  const containsEnglishWords = async (password: string) => {
    const apiKey = import.meta.env.RAPID_API_KEY
    const words = password.match(/[A-Za-z]+/g) // Split the password into words

    if (!words) {
      setHasEnglishWords(false) // No English words found in the password
      return
    }

    for (const word of words) {
      const options = {
        method: "GET",
        url: `https://wordsapiv1.p.rapidapi.com/words/${word}`,
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
        },
      }

      try {
        const response = await axios.request(options)
        console.log(response.data)

        // If the API response indicates that the word exists, it's an English word
        if (response.data.results !== undefined) {
          setHasEnglishWords(true)
          return
        }
      } catch (error) {
        // Handle API request error
        console.error("Error checking English words:", error)
        return false
      }
    }

    setHasEnglishWords(false) // No English words found in the password
  }

  //   React.useEffect(() => {
  //     containsEnglishWords(password)
  //     console.log("Contains")
  //   }, [password])

  return (
    <Stack
      sx={{
        background: "linear-gradient(56deg, #0a0023 81%, #0a0b6b)",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        width={"fit-content"}
        fontSize={"50px"}
        textAlign={"center"}
        color={"#b1448b"}
        fontWeight={"bold"}
      >
        Password Validator
      </Typography>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        mx={3}
      >
        <Box
          component={"img"}
          sx={{
            borderRadius: 1.5,
            alignItems: "center",
            justifyContent: "center",
          }}
          p={1}
          src={Logo}
          width={"80%"}
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
            (!hasLength ||
              !hasLattinLetter ||
              !hasUpperCase ||
              !hasDigit ||
              !hasSpecialChar ||
              hasEnglishWords)
          }
          onFocus={() => {
            setPasswordFocused(true)
          }}
          onBlur={() => {
            setPasswordFocused(false)
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover": {
                fieldset: { borderColor: !passwordFocused ? "#1976d2" : "" },
              },
            },
          }}
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
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover": {
                fieldset: {
                  borderColor: !repeatPasswordFocused ? "#1976d2" : "",
                },
              },
            },
          }}
        />

        <List sx={{ listStyleType: "disc", pl: 2 }}>
          <ListItem
            sx={{
              display: "list-item",
              "::marker": { color: hasLength ? "green" : "red" },
              px: 0,
            }}
          >
            <Typography color={hasLength ? "green" : "red"}>
              Password must be at between 8 and 16 characters long
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              display: "list-item",
              "::marker": { color: hasLattinLetter ? "green" : "red" },
              px: 0,
            }}
          >
            <Typography color={hasLattinLetter ? "green" : "red"}>
              Password must contain letters of the latin alphabet
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              display: "list-item",
              "::marker": { color: hasUpperCase ? "green" : "red" },
              px: 0,
            }}
          >
            <Typography color={hasUpperCase ? "green" : "red"}>
              Password must contain at least one uppercase letter
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              display: "list-item",
              "::marker": { color: hasDigit ? "green" : "red" },
              px: 0,
            }}
          >
            <Typography color={hasDigit ? "green" : "red"}>
              Password must contain at least one digit
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              display: "list-item",
              "::marker": { color: hasSpecialChar ? "green" : "red" },
              px: 0,
            }}
          >
            <Typography color={hasSpecialChar ? "green" : "red"}>
              Password must contain at least one special character{" "}
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              display: "list-item",
              "::marker": {
                color: hasEnglishWords ? "red" : "green",
              },
              px: 0,
            }}
          >
            <Typography color={hasEnglishWords ? "red" : "green"}>
              Password should not contain full English words
            </Typography>
          </ListItem>
        </List>
      </Box>
    </Stack>
  )
}

export default Homepage
