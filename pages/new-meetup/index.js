import Head from "next/head";
import { useRouter } from "next/router";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
    const router = useRouter();
    async function addMeetup(enteredData) {
        const response = await fetch("/api/new-meetup", {
            method: "POST",
            body: JSON.stringify(enteredData),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        console.log(data);

        router.push("/");
    }

    return (
        <>
		 <Head>
                <title>Add e new Meetup</title>
                <meta
                    name="description"
                    content="Add your own meetups and create amazing networking opportunities"
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetup} />;
        </>
    );
};

export default NewMeetupPage;
