async function takeTime(){
    await new Promise((resolve) => {
        setTimeout(resolve,3000);
    });
}
export const metadata={
    title:"About : Work Manager",
};
export default async function About(){
    await takeTime();
    return (
        <div><h1>This is About Route</h1></div>
    )
}