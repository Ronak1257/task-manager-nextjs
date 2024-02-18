async function takeTime(){
    await new Promise((resolve) => {
        setTimeout(resolve,3000);
    });
}

export default async function About(){
    throw new Error("this is manual error");
    await takeTime();
    return (
        <div><h1>This is About Route</h1></div>
    )
}