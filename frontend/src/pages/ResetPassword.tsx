import {useParams} from "react-router-dom";

function ResetPassword() {
    const { email, token } = useParams();

    return (
        <>
            <div>{email} and {token}</div>
        </>
    )
}

export default ResetPassword;