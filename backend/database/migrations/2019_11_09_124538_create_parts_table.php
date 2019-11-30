<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('parts', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->bigInteger('part_type_id')->unsigned()->nullable();
            $table->foreign('part_type_id')
                ->references('id')->on('part_types')->onDelete('cascade');

            $table->bigInteger('subsidiary_id')->unsigned()->nullable();
            $table->foreign('subsidiary_id')
                ->references('id')->on('subsidiaries')->onDelete('cascade');

            $table->bigInteger('computer_id')->unsigned()->nullable();
            $table->foreign('computer_id')
                ->references('id')->on('computers')->onDelete('cascade');

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
        Schema::dropIfExists('parts');
    }
}
