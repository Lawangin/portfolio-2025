import { usePageContext } from "@/context/PageContext/PageContext";
import './style.css'

interface HomeProps {
    className: string;
}

function Home({ className}: HomeProps) {
    const { pageTitle } = usePageContext();

    return (
            <h1 className={`home ${className}`}>{pageTitle}</h1>
    )
}

export default Home;