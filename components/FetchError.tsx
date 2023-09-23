import { useEffect, useState } from "react"

interface IProps {
    error: string | null
    status: string | null
}

const FetchError = ({error, status}: IProps) => {

    const [isError, setIsError] = useState(false)

    useEffect(() => {
        if(status == 'rejected') {
            setIsError(true)
        }
    }, [status])

    return (
        <div>{error}</div>
    )
}

export default FetchError