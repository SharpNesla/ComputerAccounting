<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePartTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('part_types', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->bigInteger('driver_id')->unsigned()->nullable();
            $table->foreign('driver_id')
                ->references('id')->on('software_types')->onDelete('cascade');

            $table->tinyInteger('category')->unsigned()->nullable();

            $table->text('model')->nullable();
            $table->decimal('cost')->nullable();
            $table->text('characteristics')->nullable();
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
        Schema::dropIfExists('part_types');
    }
}
