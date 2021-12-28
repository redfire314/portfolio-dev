<?php
    session_start();

    require './lib/PHPMailer/Exception.php';
    require './lib/PHPMailer/PHPMailer.php';
    require './lib/PHPMailer/SMTP.php';

    use PHPMailer\PHPMailer\Exception;
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;

    class Mensagem {
        private $destinatario = null;
        private $assunto = null;
        private $mensagem = null;

        public function enviar($destinatario, $assunto, $mensagem) {
            $this->destinatario = $destinatario;
            $this->assunto = $assunto;
            $this->mensagem = $mensagem;

            $this->validarMensagem();

            $mail = new PHPMailer(true);
            try {
                //Server settings
                $mail->SMTPDebug = SMTP::DEBUG_SERVER;
                $mail->isSMTP();
                $mail->Host       = 'smtp.gmail.com';
                $mail->SMTPAuth   = true;
                $mail->Username   = 'login';
                $mail->Password   = 'password';
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port       = 587;

                //Recipients
                $mail->setFrom('login', 'Remetente');
                $mail->addAddress($this->destinatario, 'Destinatário');

                //Content
                $mail->isHTML(true);
                $mail->Subject = $this->assunto;
                $mail->Body    = $this->mensagem;
                $mail->AltBody = $this->mensagem;

                $mail->send();
                $_SESSION['status'] = 'success';
            } catch (Exception $e) {
                $_SESSION['status'] = 'fail';
            } finally {
                header('Location: index.php');
            }
        }

        private function validarMensagem() {
            if(empty($this->destinatario) || empty($this->assunto) || empty($this->mensagem)) {
                $_SESSION['status'] = 'fail-2';
                die();
            }
        }
    }

    $mensagem = new Mensagem();
    $mensagem->enviar($_POST['destinatario'], $_POST['assunto'], $_POST['mensagem']);
?>