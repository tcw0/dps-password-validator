import { Box, Typography } from "@mui/material"

const Page404 = () => {
  return (
    <Box
      p="20px"
      height="100vh"
      width="100%"
      sx={{ background: "linear-gradient(56deg, #0a0023 81%, #0a0b6b)" }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mb="30px"
        height="100%"
      >
        <Typography
          variant="h2"
          color={"#f2aa3f"}
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
        >
          404
        </Typography>
        <Typography variant="h5" color={"#FF00A1"}>
          Page not found
        </Typography>
      </Box>
    </Box>
  )
}

export default Page404
