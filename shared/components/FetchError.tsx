import { useEffect, useState } from 'react'

// Компонента для отображения сообщения об ошибке, полученного при отправке запроса на сервер
interface IProps {
  error: string | null
  status: string | null
}

const FetchError = ({ error, status }: IProps) => {
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (status == 'rejected') {
      setIsError(true)
    }
  }, [status])

  return <>{isError && <div>{error}</div>}</>
}

export default FetchError
