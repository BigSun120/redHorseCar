import { useState, useEffect } from 'react';

export const useReload = () => {
  const [c, setC] = useState(1);

  function changeC() {
    setC(c + 1)
  }
  useEffect(() => {
    changeC()
  }, [])
  return c
}