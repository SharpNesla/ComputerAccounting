<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubsidiariesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subsidiaries', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->bigInteger('director_id')->unsigned()->nullable();
            $table->foreign('director_id')
                ->references('id')->on('users')->onDelete('cascade');

            $table->text('name')->nullable();
            $table->text('address')->nullable();
            $table->text('comment')->nullable();

            $table->index(['name','address'], 'fulltext');

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
        Schema::dropIfExists('subsidiaries');
    }
}
