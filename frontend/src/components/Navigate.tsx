import { useHistory } from "react-router";

type Props = {
    to: string
}

const Navigate = ({ to }: Props) => {
    const history = useHistory();
    history.push(to);
    return (<></>);
}

export default Navigate;