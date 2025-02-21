import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
    return (
        <>
            <Head>
                <title>Next Meetups</title>
                <meta
                    name="description"
                    content="Browse a huge list of highly active Next Meetups"
                />
            </Head>
            <MeetupList meetups={props.meetups} />;
        </>
    );
};

// export async function getServerSideProps(context) {
// 	const req = context.req;
// 	const res = context.res;

// 	// fetch data from an API

// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS
// 		}
// 	};
// };

// The following code won't be exposed on the client side!!!

export async function getStaticProps() {
    // fetch data from an API

    const client = await MongoClient.connect(
        "mongodb+srv://pashata1998:IctCOUAfcojDYa4Y@cluster0.xjhwc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
        },
        revalidate: 1,
    };
}

export default HomePage;
