import React, { useContext } from "react"

import { Snackbar, Alert, AlertColor } from "@mui/material"

type SnackbarContextType = {
  showSnackBarWithMessage: (message: string, severity: AlertColor) => void
}

export const SnackbarContext = React.createContext<SnackbarContextType>({
  showSnackBarWithMessage: () => {},
})

export function SnackbarContextProvider(props: { children: React.ReactNode }) {
  const { children } = props

  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = React.useState<string>("")
  const [severity, setSeverity] = React.useState<AlertColor>("error")

  const showSnackBarWithMessage = React.useCallback(
    (message: string, severity: AlertColor) => {
      setMessage(message)
      setSeverity(severity)
      setOpen(true)
    },
    []
  )

  const handleClose = React.useCallback(() => {
    setOpen(false)
    setMessage("")
    setSeverity("error")
  }, [])

  const value = React.useMemo(() => {
    return {
      showSnackBarWithMessage,
    }
  }, [showSnackBarWithMessage])

  return (
    <SnackbarContext.Provider value={value}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: "bottom", horizontal: "center"}}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = (): SnackbarContextType => {
  return useContext(SnackbarContext)
}
