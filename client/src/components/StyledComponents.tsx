import { TextField, Typography, styled, ListItem } from "@mui/material"

export const StyledTextfield = styled(TextField)({
  input: { color: "white" },
  fieldset: {
    borderColor: "white",
  },
  label: { color: "white" },
})

const StyledListItem = styled(ListItem)(
  ({ hasIndicator }: { hasIndicator: boolean | RegExpMatchArray | null }) => ({
    display: "list-item",
    "::marker": { color: hasIndicator ? "green" : "red" },
    px: 0,
  })
)

const StyledTypography = styled(Typography)(
  ({ hasIndicator }: { hasIndicator: boolean | RegExpMatchArray | null }) => ({
    color: hasIndicator ? "green" : "red",
  })
)

export const StyledListItemWithTypography: React.FC<{
  hasIndicator: boolean | RegExpMatchArray | null
  text: string
}> = ({ hasIndicator, text }) => {
  return (
    <StyledListItem hasIndicator={hasIndicator}>
      <StyledTypography hasIndicator={hasIndicator}>{text}</StyledTypography>
    </StyledListItem>
  )
}
