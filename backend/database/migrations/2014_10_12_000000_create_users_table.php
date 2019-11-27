<?php

use App\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('username');
            $table->string('password');


            $table->string('name')->nullable();
            $table->string('surname')->nullable();
            $table->string('patronymic')->nullable();


            $table->unsignedTinyInteger('role')->nullable();

            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });

        $user = new User();
        $user->username = 'admin';
        $user->password = bcrypt('admin');
        $user->name = 'Иван';
        $user->surname = 'Иванов';
        $user->patronymic = 'Иванович';
        $user->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
