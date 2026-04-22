<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = htmlspecialchars(trim($_POST["nome"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $messaggio = htmlspecialchars(trim($_POST["messaggio"]));

    $destinatario = "informaticasi.group@gmail.com";
    $oggetto = "Nuova richiesta di contatto dal sito web - " . $nome;

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Indirizzo email non valido. Torna indietro e riprova.");
    }

    $contenuto_email = "Hai ricevuto un nuovo messaggio dal form del sito web.\n\n";
    $contenuto_email .= "Dettagli del contatto:\n";
    $contenuto_email .= "Nome: $nome\n";
    $contenuto_email .= "Email: $email\n\n";
    $contenuto_email .= "Messaggio:\n$messaggio\n";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($destinatario, $oggetto, $contenuto_email, $headers)) {
        echo "<script>alert('Messaggio inviato con successo! Ti ricontatteremo presto.'); window.location.href='index.html';</script>";
    } else {
        echo "<script>alert('Errore durante l\'invio del messaggio. Riprova più tardi.'); window.history.back();</script>";
    }
} else {
    header("Location: index.html");
    exit();
}
