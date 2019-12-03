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


            $table->text('name')->nullable();
            $table->text('surname')->nullable();
            $table->text('patronymic')->nullable();

            $table->unsignedTinyInteger('role')->nullable();
            $table->unsignedTinyInteger('gender')->nullable();

            $table->text('passport_serial')->nullable();
            $table->text('address')->nullable();

            $table->bigInteger('superior_id')->unsigned()->nullable();
            $table->foreign('superior_id')
                ->references('id')->on('users')->onDelete('cascade');

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
