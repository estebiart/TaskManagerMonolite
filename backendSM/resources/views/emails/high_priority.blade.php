<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tarea de Alta Prioridad</title>
    <style>
        /* Estilos básicos para el correo */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Tarea de Alta Prioridad</h1>
        <p>Estimado {{ $user->first_name }},</p>
        <p>Se ha asignado una nueva tarea de alta prioridad:</p>
        <h2>{{ $task->title }}</h2>
        <p><strong>Descripción:</strong> {{ $task->description }}</p>
        <p><strong>Fecha Límite:</strong> {{ $task->deadline }}</p>
        <p><strong>Estado:</strong> {{ $task->state }}</p>
        <p><strong>Prioridad:</strong> Alta</p>
        <p>Por favor, asegúrate de atender esta tarea con la mayor prontitud posible.</p>
        <p>Saludos,<br>Tu equipo</p>
    </div>
</body>
</html>
