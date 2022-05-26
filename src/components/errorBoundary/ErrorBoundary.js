import { useState } from 'react';
import ErrorMessage from "../errorMessage/ErrorMessage";

const ErrorBoundary = (props) => {
    const [error, setError] = useState(false);

    function componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
        setError(error => true)
    }

        if (error) {
            return <ErrorMessage/>
        }
        return props.children
}

export default ErrorBoundary;