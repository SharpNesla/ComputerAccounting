<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComputersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('computers', function (Blueprint $table) {
            $table->bigIncrements('id');


            $table->tinyInteger('type')->unsigned()->nullable();

            $table->bigInteger('subsidiary_id')->unsigned()->nullable();
            $table->foreign('subsidiary_id')
                ->references('id')->on('subsidiaries')->onDelete('cascade');

            $table->bigInteger('room_id')->unsigned()->nullable();
            $table->foreign('room_id')
                ->references('id')->on('rooms')->onDelete('cascade');

            $table->bigInteger('responsible_id')->unsigned()->nullable();
            $table->foreign('responsible_id')
                ->references('id')->on('employees')->onDelete('cascade');

            $table->text('name')->nullable();
            $table->text('inventory_id')->nullable();
            $table->text('comment')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('computers');
    }
}
