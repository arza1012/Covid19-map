import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home({ data, countries }) {
  console.log("lowcovidcountrie", countries);
  return (
    <div className={styles.container}>
      <Head>
        <title>Low Covid Countries</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.headersInfo}>
        <p>Latest update: {data.Date.split("T")[0]}</p>
        <p>
          Countries Currently Less than 20,000 Confirmed Cases:{" "}
          {countries.length}
        </p>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch("https://api.covid19api.com/summary");
  const data = await res.json();
  const countries = await data.Countries.filter(
    (country) => country.TotalConfirmed < 20000
  );
  countries.sort((a, b) => (a.TotalConfirmed > b.TotalConfirmed ? 1 : -1));

  return {
    props: { data, countries },
  };
}
