<?php


namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\HighPriorityNotification;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;


class TaskController extends Controller
{


    /**
     * @OA\Get(
     *     path="/api/tasks",
     *     tags={"Tasks"},
     *     summary="List all tasks",
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="A list of tasks"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request"
     *     )
     * )
     */
    public function index(Request $request)
    {
        $query = Task::query();

        if ($request->has('state')) {
            $query->where('state', $request->input('state'));
        }

        if ($request->has('priority')) {
            $query->where('priority', $request->input('priority'));
        }

        $tasks = $query->paginate(10);
        return response()->json($tasks);
    }

    /**
     * @OA\Post(
     *     path="/api/tasks",
     *     tags={"Tasks"},
     *     summary="Create a new task",
     *     security={{"bearerAuth": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"title", "deadline", "status"},
     *             @OA\Property(property="title", type="string"),
     *             @OA\Property(property="description", type="string"),
     *             @OA\Property(property="deadline", type="string", format="date"),
     *             @OA\Property(property="status", type="string", enum={"pending", "in_progress", "completed"}),
     *             @OA\Property(property="priority", type="string", enum={"low", "medium", "high"})
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Task created successfully"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Validation Error"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     )
     * )
     */
    public function store(Request $request)
    {
        DB::enableQueryLog();
    
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'deadline' => 'required|date',
            'status' => 'required|in:pending,in_progress,completed',
            'priority' => 'nullable|in:low,medium,high',
            'user_id' => 'required|exists:users,id'
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
    
        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'deadline' => $request->deadline,
            'status' => $request->status,
            'priority' => $request->priority,
            'user_id' => $request->user_id,
        ]);
    
        if ($task->priority === 'high') {
            try {
                if (Auth::check()) {
                    $user = Auth::user();
                    $data = json_decode($user);
                    $email = $data->email;
                    Mail::to($email)->send(new HighPriorityNotification($task));
                } else {
                    return response()->json(['message' => 'Error al enviar el correo'], 500);
                }
            } catch (\Exception $e) {
        
                return response()->json(['message' => 'Error al enviar el correo: ' . $e->getMessage()], 500);
            }
        }

    
        return response()->json($task, 201);
    }
    

    /**
     * @OA\Get(
     *     path="/api/tasks/{id}",
     *     tags={"Tasks"},
     *     summary="Get a task by ID",
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Task retrieved successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Task not found"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     )
     * )
     */
    public function show($id)
    {
        $task = Task::find($id);
        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        return response()->json($task);
    }

    /**
     * @OA\Put(
     *     path="/api/tasks/{id}",
     *     tags={"Tasks"},
     *     summary="Update a task",
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"title", "deadline", "status"},
     *             @OA\Property(property="title", type="string"),
     *             @OA\Property(property="description", type="string"),
     *             @OA\Property(property="deadline", type="string", format="date"),
     *             @OA\Property(property="status", type="string", enum={"pending", "in_progress", "completed"}),
     *             @OA\Property(property="priority", type="string", enum={"low", "medium", "high"})
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Task updated successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Task not found"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Validation Error"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        $task = Task::find($id);
        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'deadline' => 'required|date',
            'status' => 'required|in:pending,in_progress,completed',
            'priority' => 'nullable|in:low,medium,high',
            'user_id' => 'required|exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $task = Task::create($request->only(['title', 'description', 'deadline', 'status', 'priority', 'user_id']));

        if ($task->priority === 'high') {
            Mail::to(auth()->user()->email)->send(new HighPriorityNotification($task));
        }

        return response()->json($task);
    }

    /**
     * @OA\Delete(
     *     path="/api/tasks/{id}",
     *     tags={"Tasks"},
     *     summary="Delete a task",
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Task deleted successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Task not found"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     )
     * )
     */
    public function destroy($id)
    {
        $task = Task::find($id);
        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $task->delete();
        return response()->json(['message' => 'Task deleted successfully']);
    }
    
}
