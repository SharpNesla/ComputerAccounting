<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDependenciesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dependencies', function (Blueprint $table) {
            $table->bigInteger('dependent_id')->unsigned()->nullable();
            $table->foreign('dependent_id')
                ->references('id')->on('software_types')->onDelete('cascade');

            $table->bigInteger('dependency_id')->unsigned()->nullable();
            $table->foreign('dependency_id')
                ->references('id')->on('software_types')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dependencies');
    }
}
