<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSoftwareTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('software', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->bigInteger('software_type_id')->unsigned()->nullable();
            $table->foreign('software_type_id')
                ->references('id')->on('software_types')->onDelete('cascade');

            $table->bigInteger('computer_id')->unsigned()->nullable();
            $table->foreign('computer_id')
                ->references('id')->on('computers')->onDelete('cascade');

            $table->bigInteger('license_id')->unsigned()->nullable();
            $table->foreign('license_id')
                ->references('id')->on('licenses')->onDelete('cascade');

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
        Schema::dropIfExists('software');
    }
}
