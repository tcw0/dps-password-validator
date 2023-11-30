import React from "react"
import { Box, Stack, List, ListItem, Typography } from "@mui/material"
import Logo from "../assets/dps.png"
import axios, { AxiosError } from "axios"
import dpsButton from "../assets/dps_button.svg"
import PasswordStrength, {
  PasswordStrengthEnum,
} from "../components/PasswordStrength"
import { StyledTextfield } from "../components/StyledComponents"
import { SnackbarContext } from "../contexts/SnackbarContext"

function Homepage() {
  const [password, setPassword] = React.useState("")
  const [repeatedPassword, setRepeatedPassword] = React.useState("")

  const [passwordFocused, setPasswordFocused] = React.useState(false)
  const [repeatPasswordFocused, setRepeatPasswordFocused] =
    React.useState(false)

  const { showSnackBarWithMessage } = React.useContext(SnackbarContext)

  const hasLength = password.length >= 8 && password.length <= 16
  const hasLatinLetter = password.match(/[A-Za-z]/)
  const hasUpperCase = password.match(/[A-Z]/)
  const hasDigit = password.match(/[0-9]/)
  const hasSpecialChar = password.match(/[^A-Za-z0-9]/)

  const passwordsMatch = () => {
    return repeatedPassword === password
  }

  const containsEnglishWords = async (password: string) => {
    const apiKey = import.meta.env.VITE_RAPID_API_KEY
    const words = password.match(/[A-Za-z]+/g) // Split the password into words

    console.log(apiKey)

    if (!words) {
      return false
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
        if (response.data) {
          console.log(`Word found: ${word}`)
          return true
        }
      } catch (error) {
        // Handle API request error
        if (
          axios.isAxiosError(error) &&
          (error as AxiosError).response?.status === 404
        ) {
          // 404 means the word is not found, it's not an error for our purpose
          console.log(`Word not found: ${word}`)
        } else {
          // Handle other errors
          console.error("Error checking English words:", error)
          return true
        }
      }
    }
    return false // No English words found in the password
  }

  const validPassword = () => {
    return hasLength && hasLatinLetter && hasDigit && passwordsMatch()
  }

  const handleValidation = async () => {
    const hasEnglishWords = await containsEnglishWords(password)

    if (validPassword() && !hasEnglishWords) {
      console.log(hasEnglishWords)
      showSnackBarWithMessage("Password is valid", "success")
    } else {
      showSnackBarWithMessage("Password is invalid", "error")
    }
  }

  const passwordStrength = () => {
    if (!password) return PasswordStrengthEnum.WEAK

    let strength = 0
    if (hasLength && hasLatinLetter && hasDigit) {
      strength++

      if (hasUpperCase) {
        strength++
      }
      if (hasSpecialChar) {
        strength++
      }
    }

    if (strength === 0) {
      return PasswordStrengthEnum.WEAK
    } else if (strength === 1) {
      return PasswordStrengthEnum.MEDIUM
    } else if (strength === 2) {
      return PasswordStrengthEnum.STRONG
    } else if (strength === 3) {
      return PasswordStrengthEnum.FULL
    }

    return PasswordStrengthEnum.WEAK
  }

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
          mb={2}
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
        <PasswordStrength passwordStrength={passwordStrength()} />

        <List sx={{ listStyleType: "disc", pl: 2 }}>
          <ListItem
            sx={{
              display: "list-item",
              "::marker": { color: hasLength ? "green" : "red" },
              px: 0,
            }}
          >
            <Typography color={hasLength ? "green" : "red"}>
              Password must be between 8 and 16 characters long
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              display: "list-item",
              "::marker": { color: hasLatinLetter ? "green" : "red" },
              px: 0,
            }}
          >
            <Typography color={hasLatinLetter ? "green" : "red"}>
              Password must contain letters of the latin alphabet
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
        </List>
        <Box
          component={"img"}
          sx={{
            borderRadius: 1.5,
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.2)",
            },
            cursor: validPassword() ? "pointer" : "default",
            filter: validPassword() ? "none" : "grayscale(100%)",
          }}
          p={1}
          src={dpsButton}
          alt="Validate Password"
          onClick={validPassword() ? handleValidation : undefined}
          width={"80%"}
        />
      </Box>
    </Stack>
  )
}

export default Homepage
