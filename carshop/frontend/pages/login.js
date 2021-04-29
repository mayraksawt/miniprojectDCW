import Head from "next/head";
import Link from 'next/link';
import Layout from "../components/layout";
import { useState } from "react";
import Navbar from "../components/navbar";
import styles from "../styles/Home.module.css";
import axios from "axios";
import config from "../config/config";

export default function Login({ token }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [remember, setRemember] = useState(false);
  const login = async (req, res) => {
    try {
      let result = await axios.post(`${config.URL}/login`,{ username, password, remember },{ withCredentials: true });
      console.log("result: ", result);
      console.log("result.data:  ", result.data);
      console.log("token:  ", token);
      setStatus(result.status + ": " + result.data.user.username);
    } 
    catch (e) {
      console.log("error: ", JSON.stringify(e.response));
      setStatus(JSON.stringify(e.response).substring(0, 80) + "...");
    }
  };
  const reMem = async () => {
    setRemember(!remember);
  };

  const loginForm = () => (
    <div className={styles.gridContainer}>
      <div className={styles.name}><b>Username:</b></div>
      <div>
        <input
          type="text"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={styles.name}><b>Password:</b></div>
      <div>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center">
        <input
          id="remember_me"
          name="remember_me"
          type="checkbox"
          onClick={reMem}
        />
       
      </div> 
      <div className={styles.text}><label><ins><i><b>Remember Me</b></i></ins></label></div>
    </div>
  );

  const copyText = () => {
    navigator.clipboard.writeText(token);
  };

  return (
    <Layout>
      <Head>
        <title>Login Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
        <script src="https://kit.fontawesome.com/yourcode.js" crossorigin="anonymous"></script>
      </Head>
      <Navbar />
      <div className={styles.container}>
      <div className={styles.showlogin}>
       <center><h1><ins><i><b>Admin Login</b></i></ins></h1>
        <div>
          <b>Token:</b> {token.substring(0, 15)}...
          <button className={styles.btn1} onClick={copyText}> Copy token </button>
        </div></center> 
        <br />
        <div className={styles.text4}><h4><b>Status: <i>{status}</i></b></h4></div>
        <br />
        {loginForm()}
        <center>
        <div>
          <button className={styles.btn2} onClick={login}>Login</button>
        </div>
        <h4 className={styles.texth4}><ins><i>Do not have an account?</i></ins></h4>
        </center>
        <div className={styles.right}>
        <Link href="/register"><button className={styles.btn}>Register</button></Link>
        </div>
        
      </div>
      </div>
    </Layout>
  );
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
