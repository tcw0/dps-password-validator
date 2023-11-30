import React from "react"
import { Box, Icon, Typography } from "@mui/material"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import CheckIcon from "@mui/icons-material/Check"

export enum PasswordStrengthEnum {
  WEAK = "Weak",
  MEDIUM = "Medium",
  STRONG = "Strong",
  FULL = "Strong",
}

function PasswordStrength({
  passwordStrength,
}: {
  passwordStrength: PasswordStrengthEnum
}) {
  const getIcon = (strength: PasswordStrengthEnum) => {
    let icon = ErrorOutlineIcon
    switch (strength) {
      case PasswordStrengthEnum.WEAK:
        icon = ErrorOutlineIcon
        break
      case PasswordStrengthEnum.MEDIUM:
        icon = CheckIcon
        break
      case PasswordStrengthEnum.STRONG:
        icon = CheckIcon
        break
      case PasswordStrengthEnum.FULL:
        icon = CheckIcon
        break
    }
    return icon
  }

  const generateColors = (strength: PasswordStrengthEnum) => {
    let result: string[] = []
    const COLORS = {
      NEUTRAL: "hsla(0, 0%, 88%, 1)",
      WEAK: "hsla(353, 100%, 38%, 1)",
      MEDIUM: "hsla(40, 71%, 51%, 1)",
      STRONG: "hsla(134, 73%, 30%, 1)",
    }

    switch (strength) {
      case PasswordStrengthEnum.WEAK:
        result = [COLORS.WEAK, COLORS.NEUTRAL, COLORS.NEUTRAL, COLORS.NEUTRAL]
        break
      case PasswordStrengthEnum.MEDIUM:
        result = [COLORS.MEDIUM, COLORS.MEDIUM, COLORS.NEUTRAL, COLORS.NEUTRAL]
        break
      case PasswordStrengthEnum.STRONG:
        result = [COLORS.STRONG, COLORS.STRONG, COLORS.STRONG, COLORS.NEUTRAL]
        break
      case PasswordStrengthEnum.FULL:
        result = [COLORS.STRONG, COLORS.STRONG, COLORS.STRONG, COLORS.STRONG]
        break
    }
    return result
  }

  const Icon = getIcon(passwordStrength)
  const colors = generateColors(passwordStrength)

  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"5px"}
        margin={"10px 0"}
        width={"100%"}
      >
        {colors.map((color, index) => (
          <Box
            key={index}
            flex={1}
            height={"5px"}
            borderRadius={"5px"}
            bgcolor={color}
          ></Box>
        ))}
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        gap={"5px"}
        width={"100%"}
      >
        <Icon htmlColor={colors[0]} />
        <Typography color={colors[0]}>{passwordStrength}</Typography>
      </Box>
    </>
  )
}

export default PasswordStrength
