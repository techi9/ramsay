import dynamic from "next/dynamic";

const NoSSRComponent = dynamic(() => import("./gameImplementation"), {
    ssr: false,
});

export default function Game(props) {
    return <NoSSRComponent />;
}